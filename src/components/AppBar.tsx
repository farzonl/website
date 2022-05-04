import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { Button, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerButtons: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

interface AppBarProps {
  window?: () => Window;
  children: React.ReactElement;
  buttons: {
    title: string;
    onClick?: () => void;
  }[];

  sideButtion: {
    title: string;
  };
}

function HideOnScroll(props: AppBarProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func
};

export default function HideAppBar(props: AppBarProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ background: "rgba(0,0,0,0.5)" }}>
          <Toolbar className={classes.centerButtons}>
            {props.buttons.map((button, i) => {
              return (
                <Button
                  key={i}
                  style={{width : 10, fontSize : 11}}
                  color="inherit"
                  onClick={
                    button.onClick
                      ? button.onClick
                      : () => {
                          const id = document.getElementById(button.title);
                          return id != null ? id.scrollIntoView() : () => {};
                        }
                  }
                >
                  {button.title}
                </Button>
              );
            })}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
}
