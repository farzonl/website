import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { GridItem } from "./ItemGrid";
import { CardActionArea, Badge } from "@material-ui/core";
import ChipList from "./ChipList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: "rgba(255,255,255,0.8)",
      width: 345,
      height: 200
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

export default function MediaCard(props: GridItem) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={props.itemButtonAction}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Avatar"
              src={props.avatarUrl}
              className={classes.avatar}
            />
          }
          action={<ChipList chips={[props.badgeName]} />}
          title={props.title}
          subheader={props.subtitle}
        />

        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ height: 40 }}
          >
            {props.body.substring(0, 125) +
              (props.body.length > 125 ? "..." : "")}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton onClick={props.likeButtonAction} aria-label="Like">
          <Badge badgeContent={props.likeCount} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
