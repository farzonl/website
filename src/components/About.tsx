import React from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Icon
} from "@material-ui/core";
import { GithubProfileResponse, GithubConfigResp } from "../types/Github";
import DeleteIcon from "@material-ui/icons/Delete";

export interface AboutProps {
  profile: GithubProfileResponse | undefined;
  config: GithubConfigResp | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "white",
      marginRight: 5,
      borderRadius: 5,
      width: 10
    },
    socialButtonSet: {
      marginTop: -13,
      marginLeft: -15
    }
  })
);

export default function AboutProps(props: AboutProps) {
  const classes = useStyles();

  return (
    <div>
      <div
        id="About"
        style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
      >
        <Avatar
          alt={props.profile ? props.profile.name : ""}
          src={props.profile ? props.profile.avatar_url : ""}
          style={{
            // marginTop:10,

            width: 150,
            height: 150
          }}
        />
        <div style={{ marginLeft: "2%", marginTop: "3%" }}>
          <Typography style={{ color: "white" }} variant="h3" component="h2">
            I'm {props.profile ? props.profile.name : ""}
          </Typography>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <Typography
              style={{ color: "white", paddingRight: 20 }}
              variant="subtitle1"
              component="h2"
            >
              {props.profile ? props.profile.bio : ""}
            </Typography>

            <div className={classes.socialButtonSet}>
              {Object.keys(props.config ? props.config.About.Social : {}).map(
                (social, i) => {
                  return (
                    <IconButton key={i} className={classes.button} onClick ={() => {window.location.href = (props.config) ? props.config.About.Social[social] : ""}}>
                      <Icon className={`ion-${(social.toLowerCase() === "mail" || social.toLowerCase() === "call") ? "md-" : "logo-"}${social.toLowerCase()}`} />
                    </IconButton>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {props.config ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10
          }}
        >
          <Paper
            style={{ width: "70%", backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
              <Typography component="p">
                {props.config ? props.config.About.Bio : ""}
              </Typography>
            </Paper>
          </Paper>
        </div>
      ) : (
        props.config
      )}
    </div>
  );
}
