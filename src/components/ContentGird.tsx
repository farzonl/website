import { Grid } from "@material-ui/core";
import { GridDirection } from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
  // @ts-ignore
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid
        direction={direction}
        justify="center"
        alignItems="center"
        container
        spacing={1}
      >
        {componentGenerator.map((gen, key) => (
          <div className={classes.root}>
            <Grid key={key} item style={{ paddingLeft: 10, paddingRight: 10 }}>
              {gen()}
            </Grid>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};
