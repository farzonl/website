import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },

    chip: {
      backgroundColor : "rgba(255,255,255,0.8)",
      borderColor : "transparent",
      margin: theme.spacing(1),
    },
  }),
);

export interface ChipListProps{
    chips : string[]
}


export default function ChipList(props : ChipListProps) {
  const classes = useStyles({});

  
  return (
    <div className={classes.root}>
        {
            props.chips.map((chip,id) => {
                return (
                    <Chip
                    key={id}
                    label={chip}
                    className={classes.chip}
                  />
                )
            })
        }

    </div>
  );
}