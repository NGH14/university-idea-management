import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Divider, Grid} from "@material-ui/core";
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";
import {Button, InputBase, Menu, MenuItem, Pagination} from "@mui/material";

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: 'none',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const actionButtonIdea = [
    <Button startIcon={<EditIcon />}  style={{ backgroundColor: "#4caf50" }} variant={"contained"}>Update Idea</Button>,
    <Button startIcon={<DeleteIcon />} style={{ backgroundColor: "#ba000d" }} variant={"contained"} >Delete Idea</Button>
];
function IdeaSubView(){
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ITEM_HEIGHT = 48;
    const renderCardHeader = () => {
        return <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
            }
            action={renderActionIdea()}
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
    }
    const renderActionIdea = () => {
        return <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {actionButtonIdea.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    }
    const renderCardContent = () => {
        return <CardContent>
            <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>

        </CardContent>
    }
    const renderActionButton = () => {
        return <CardActions disableSpacing style={{paddingRight: 15, paddingLeft: 15}}>

            <Button aria-label="add to favorites" startIcon={<ThumbUpIcon />} color={"inherit"} variant="contained" style={{marginRight: 20}} size={"small"}>
                Like (0)
            </Button>
            <Button aria-label="add to favorites" startIcon={<ThumbDownIcon />} color={"inherit"} variant="contained" size={"small"}>
                Dislike (0)
            </Button>

            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>

        </CardActions>
    }
    const renderComment = () => {
        return <Collapse in={expanded} timeout="auto" unmountOnExit >
            <div style={{paddingRight: 15, paddingLeft: 15}}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', background: "#F0F2F5" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Comment idea ..."
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <SendIcon />
                    </IconButton>
                </Paper>
            </div >
            <div style={{paddingRight: 15, paddingLeft: 15, marginTop: 15}}>
                <strong>Comment</strong>
            </div>
            <Paper style={{ padding: 15 }}>

                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth >

                        <div style={{ borderRadius: 15, padding: 10, background: "#F0F2F5"}}>
                            <p style={{ margin: 0, textAlign: "left", fontWeight: "bold", fontSize: 18, color: "black"}}>Michel Michel</p>
                            <p style={{ textAlign: "left" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            </p>
                        </div>
                        <p style={{ textAlign: "left", color: "gray", marginTop: 8, marginLeft: 15 }}>
                            Commented {moment('2022-03-15T13:45:30', "YYYYMMDD").fromNow()}
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </Collapse>
    }
    const renderPagination = () => {
        return <div style={{justifyContent: "right", marginBottom: 20, width: '100%', display: "flex"}}>
            <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
    }
     return (
        <>
            {renderPagination()}
            <Card style={{  border: "1px solid #90a4ae"}} >
                {renderCardHeader()}
                {renderCardContent()}
                {renderActionButton()}
                {renderComment()}
            </Card>
        </>
    );
}
export default IdeaSubView;