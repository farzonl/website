import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Icon } from '@material-ui/core';

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
    chips : string[],
    additionalTitle? : {[key : string] : number}
    onClick? : (arg : string) => void
}

function intToString (value: number) {
  var suffixes = ["", "k", "m", "b","t"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  return shortValue+suffixes[suffixNum];
}
export default function ChipList(props : ChipListProps) {
  const classes = useStyles({});

  //props arguments into components 
  //state dynamiclly changing varaible in component
  return (
    <div className={classes.root}>
        {
            props.chips.map((chip,id) => {
                return (
                    <Chip
                    
                    onClick={() => {
                      if (props.onClick) {props.onClick(chip);}
                    }}
                    icon={<Icon style={{fontSize:15}} className={`devicon-${chip.toLowerCase().replace(/\+/g,'plus').replace(/#/g, 'sharp')}-plain`}></Icon> }
                    key={id}
                    label={chip + ((props.additionalTitle && props.additionalTitle[chip] > 0) ? (` lines: ${Math.ceil(100*(props.additionalTitle[chip]/props.additionalTitle.total))}%`) : "") }
                    className={classes.chip}
                  />
                )
            })
        }

    </div>
  );
}