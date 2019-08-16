import {
  Avatar,
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import React from "react";
import { GithubConfigResp, GithubProfileResponse } from "../types/Github";
import { TextBlock } from "./TextBlock";

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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
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
                    <IconButton
                      key={i}
                      className={classes.button}
                      onClick={() => {
                        window.location.href = props.config
                          ? props.config.About.Social[social]
                          : "";
                      }}
                    >
                      <Icon
                        className={`ion-${
                          social.toLowerCase() === "mail" ||
                          social.toLowerCase() === "call"
                            ? "md-"
                            : "logo-"
                        }${social.toLowerCase()}`}
                      />
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
          <TextBlock description={props.config ? props.config.About.Bio : ""} />
        </div>
      ) : (
        props.config
      )}
    </div>
  );
}
