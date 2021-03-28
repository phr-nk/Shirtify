import React, { Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
function UserInfo(props) {
  return (
    <Fragment>
      {props.image !== "" ? (
        <Fragment>
          <img
            style={{
              borderRadius: "90%",
              height: 150,
              width: 150,
              objectFit: "cover",
              marginTop: "2rem",
            }}
            src={props.image}
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "3rem",
            }}
          >
            <p>{props.name}</p>
            <Button
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "1.5rem",
              }}
              variant="outlined"
              color="primary"
              onClick={props.logout}
              size="small"
            >
              Log out
            </Button>
          </div>
        </Fragment>
      ) : (
        <CircularProgress color="primary"></CircularProgress>
      )}
    </Fragment>
  );
}

export default UserInfo;
