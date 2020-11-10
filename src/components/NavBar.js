import React, { useContext, useState } from "react";
import {
    Container,
    Paper,
    Tabs,
    Tab,
    Grid,
    Menu,
    MenuItem,
    Button,
    Avatar,
    Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import SortIcon from "@material-ui/icons/Sort";
// import { Link as RouterLink } from "react-router-dom";
import ky from "ky";
import UserProvider from "../contexts/UserProvider";

const baseUrl =
    process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_LOCALHOST;

const useStyles = makeStyles((theme) => ({
    btn: {
        textTransform: "none",
        height: "100%",
        paddingLeft: "0.6rem",
        paddingRight: "1.2rem",
        borderRadius: 0,
    },
    [theme.breakpoints.down("xs")]: {
        btn: {
            paddingLeft: "0.5rem",
            paddingRight: "0.7rem",
        },
    },
}));

function NavBar(props) {
    const {
        totalComments,
        //  sortComments
    } = props;
    const classes = useStyles();
    const userCtx = useContext(UserProvider.context);

    const [userAnchorEl, setUserAnchorEl] = useState(null);
    // const [sortAnchorEl, setSortAnchorEl] = useState(null);

    const handleUserClick = (event) => {
        setUserAnchorEl(event.currentTarget);
    };

    // const handleSortClick = (event) => {
    //     setSortAnchorEl(event.currentTarget);
    // };

    const handleClose = () => {
        setUserAnchorEl(null);
        // setSortAnchorEl(null);
    };

    const logOut = async () => {
        userCtx.logOutUser();
        try {
            await ky.get(`${baseUrl}/users/logout`, {
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const getUser = async () => {
    //     try {
    //         let userData = await ky
    //             .post("/users/login", {
    //                 credentials: "include",
    //                 json: {
    //                     email: "tousif@email.com",
    //                     password: "password",
    //                 },
    //             })
    //             .json();
    //         localStorage.setItem("user", JSON.stringify(userData.data));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    let UserButton;
    if (userCtx.token)
        UserButton = (
            <React.Fragment>
                <Button
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    className={classes.btn}
                    // fullWidth
                    endIcon={<ExpandMoreIcon />}
                    onClick={handleUserClick}
                >
                    <Avatar
                        alt={userCtx.name}
                        src={userCtx.photo}
                        style={{
                            height: "25px",
                            width: "25px",
                            marginRight: "5px",
                        }}
                    />
                    <Hidden xsDown>{userCtx.name.split(" ")[0]}</Hidden>
                </Button>
                <Menu
                    id="user-menu"
                    anchorEl={userAnchorEl}
                    keepMounted
                    open={Boolean(userAnchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={(event) => {
                            handleClose(event);
                        }}
                        component="a"
                        href={`${baseUrl}/profile`}
                        target="_blank"
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={(e) => {
                            logOut();
                            handleClose(e);
                            // window.open(
                            //     "http://localhost:4000/login",
                            //     "Log in with Email",
                            //     'width=600,height="100%",scrollbars=no'
                            // );
                        }}
                    >
                        Log out
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );

    return (
        <Container maxWidth="md">
            <Paper square>
                <Grid container>
                    <Grid item>
                        <Tabs value={0}>
                            <Tab
                                style={{ textTransform: "none" }}
                                label={`${totalComments} Comments`}
                                disableRipple
                            />

                            {/* <Tab
                        className={classes.tab}
                        label="Community"
                        href="https://www.adilide.com/converse/privacy-policy"
                        target="_blank"
                    /> */}
                        </Tabs>
                    </Grid>

                    {/* <Grid item style={{ marginLeft: "auto" }}>
                        <Button
                            aria-controls="sorting-menu"
                            aria-haspopup="true"
                            className={classes.btn}
                            startIcon={<SortIcon />}
                            onClick={handleSortClick}
                        >
                            <Hidden xsDown>Sort By</Hidden>
                        </Button>
                        <Menu
                            id="sorting-menu"
                            anchorEl={sortAnchorEl}
                            keepMounted
                            open={Boolean(sortAnchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={(event) => {
                                    handleClose(event);
                                    sortComments("newest");
                                }}
                            >
                                Newest
                            </MenuItem>
                            <MenuItem
                                onClick={(event) => {
                                    handleClose(event);
                                    sortComments("likes");
                                }}
                            >
                                Most Liked
                            </MenuItem>
                        </Menu>
                    </Grid> */}

                    <Grid item style={{ marginLeft: "auto" }}>
                        {userCtx.token ? (
                            UserButton
                        ) : (
                            <Button
                                className={classes.btn}
                                href={`${baseUrl}/login`}
                                target="_blank"
                            >
                                Log in
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default NavBar;
