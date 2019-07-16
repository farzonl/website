import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: "100%", paddingTop: "5%", paddingBottom: "5%" },
    title: { textAlign: "center", paddingBottom: 10, color: "white" },
    subtitle: { textAlign: "center", paddingBottom: 10, color: "white" }

  })
);

export interface SectionProps {
  children: React.ReactElement;
  sectionTitle : string;
  sectionDescription : string
  subtitleAfter : boolean
}

export default function Section(props: SectionProps) {
  const classes = useStyles();
  const subtitleComp = (
    <Typography className={classes.subtitle} variant="subtitle1" component="h2">
    {props.sectionDescription}
  </Typography>
  )
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2" component="h2">
        {props.sectionTitle}
      </Typography>
      {(!props.subtitleAfter) ? subtitleComp : null}
      {props.children}
      {(props.subtitleAfter) ? subtitleComp : null}


    </div>
  );
}
