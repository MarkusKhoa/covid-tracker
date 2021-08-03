import React, {useEffect, useState} from 'react'
import { getCountry, getReportByCountry } from './apis/index'
import CountrySelector from './components/CountrySelector'
import Highlight from './components/HighlightChart/Highlight.jsx'
import Summary from './components/Summary'
import {sortBy} from 'lodash';

function App() {
  const [countries, setcountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountry().then((res) =>{
      console.log({res});

      const countries = sortBy(res.data, 'Country')
      setcountries(countries);

      setSelectedCountryID('vn');
    })
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  }


  //useEffect always executes after the first render, so we need to check if users have selected country ID yet.
  useEffect(() => {
    if (selectedCountryID) {
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryID);
      //call API
      getReportByCountry(Slug).then((res) => {
      //Remove last item
      res.data.pop();
      setReport(res.data);
    });
    }
  }, [countries, selectedCountryID])

  return <>
    <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID}/>
    <Highlight report={report}/>
    <Summary report={report}/>
  </>
}

export default App
