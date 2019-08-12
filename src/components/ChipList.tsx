import { Icon } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    },

    chip: {
      backgroundColor: "rgba(255,255,255,0.8)",
      borderColor: "transparent",
      margin: theme.spacing(1)
    }
  })
);

export interface ChipListProps {
  chips: string[];
  additionalTitle?: { [key: string]: number };
  onClick?: (arg: string) => void;
}

export default function ChipList(props: ChipListProps) {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      {props.chips.map((chip, id) => {
        return (
          <Chip
            onClick={() => {
              if (props.onClick) {
                props.onClick(chip);
              }
            }}
            icon={
              <Icon
                style={{ fontSize: 15 }}
                className={`devicon-${chip
                  .toLowerCase()
                  .replace(/\+/g, "plus")
                  .replace(/#/g, "sharp")}-plain`}
              />
            }
            key={id}
            label={
              chip +
              (props.additionalTitle && props.additionalTitle[chip] > 0
                ? ` lines: ${Math.ceil(
                    100 *
                      (props.additionalTitle[chip] /
                        props.additionalTitle.total)
                  )}%`
                : "")
            }
            className={classes.chip}
          />
        );
      })}
    </div>
  );
}
