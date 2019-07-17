import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from './MediaCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width : "110%",
      marginLeft : "-5%"
    },
    control: {
      padding: theme.spacing(1),
    },
  }),
);


export interface GridItem{
  title : string
  body : string
  badgeName : string
  subtitle : string
  avatarUrl : string
  likeCount? : number
  likeButtonAction? : () => void
  itemButtonAction : () => void

}

export interface SpacingGridProps{
  gridItems : GridItem[]
}

export default function ItemGrid(props : SpacingGridProps) {
  const classes = useStyles();



  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {props.gridItems.map((value,i) => (
            <Grid key={i} item>
              <MediaCard {...value}/>
            </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}
