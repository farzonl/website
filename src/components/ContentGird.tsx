import { Button, Grid } from "@material-ui/core";
import { GridDirection } from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 30,
    maxWidth: 500,
    minWidth: 300,
    display: "block",
    width: "50%",
    flexGrow: 1
  }
}));

export interface ContentGridProps {
  componentGenerator: (() => JSX.Element)[];
  direction: GridDirection;
}

export const ContentGrid = ({
  direction,
  componentGenerator
}: ContentGridProps) => {
  const [showMore, changeShowMore] = useState(false);
  const threshold = 2;
  // @ts-ignore
  const classes = useStyles();
  let filtercomponentGenerator = componentGenerator.filter((_, i) => {
    return i < (showMore ? componentGenerator.length : threshold);
  })
  return (
    <div>
    <Grid item xs={12}>
      <Grid
        direction={direction}
        justify="center"
        alignItems="center"
        container
        spacing={1}
      >
        {filtercomponentGenerator.map((gen, key) => (
          <div className={classes.root}>
            <Grid key={key} item style={{ paddingLeft: 10, paddingRight: 10 }}>
              {gen()}
            </Grid>
          </div>
        ))}
      </Grid>
    </Grid>
    {componentGenerator.length > threshold ? (
        <Button
          style={{
            display: "block",
            color: "white",
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          onClick={() => {
            changeShowMore(old => {
              return !old;
            });
          }}
        >
          {showMore ? "Show Less" : "Show More"}
    </Button>): null}
    </div>
  );
};
