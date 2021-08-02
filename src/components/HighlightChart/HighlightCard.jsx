import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.type === "confirmed") return { border: "3px solid #f5ab2c" };
    if (props.type === "recovered") return { border: "3px solid #1eeb0c" };
    else return { border: "3px solid #f70505" };
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
  },
  count: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

const customTitle = makeStyles({
  title: (text) => {
    if (text.title === "Total cases") return { color: "#f2c224" };
    if (text.title === "Total recovered") return { color: "#4caf50" };
    else return { color: "#d32f2f" };
  },
});

const HighlightCard = ({ title, count, type }) => {
  const styles = useStyles({ type });
  const titleStyle = customTitle({ title });

  const colortheme = createTheme({
    palette: {
      primary: { main: "#f2c224", contrastText: "secondary" },
      secondary: { main: "#4caf50", contrastText: "secondary" },
      error: { main: "#d32f2f", contrastText: "" },
    },
  });

  return (
    <Card className={styles.wrapper}>
      <CardContent>
        <ThemeProvider theme={colortheme}>
          <Typography
            className={titleStyle.title}
            component="p"
            variant="body2"
          >
            {title}
          </Typography>

          <Typography component="span" variant="body2">
            {count}
          </Typography>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
