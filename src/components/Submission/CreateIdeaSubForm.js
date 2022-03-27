import "../User/EditUserForm/style.css";
import CloseIcon from "@mui/icons-material/Close";
import {TextareaAutosize, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, {useState} from "react";
import * as yup from "yup";
import Box from "@mui/material/Box";
import './style.css';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {DropzoneArea, DropzoneDialog} from "@pandemicode/material-ui-dropzone";

const CssTextField = styled(TextField)({
    ".MuiFormHelperText-root": {
        fontSize: "14px",
        fontFamily: "Poppins",
    },

    "& .MuiInputBase-root": {
        color: "#000",
        fontSize: "16px",
        fontFamily: "Poppins",
    },
    "& label.Mui-focused": {
        color: "#000",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#000",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderRadius: "5px",
        },
        "&:hover fieldset": {
            border: "1px solid #000000",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #000000",
        },
    },
});

const ColorButton = styled(Button)(() => ({
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "none",
    minWidth: 200,
    display: "inline-block",

    margin: "10px",
    padding: "10px",

    "&:disabled ": { cursor: "not-allowed", pointerEvents: "all !important" },
}));

const validationSchema = yup.object({
    name: yup.string().required("Full Name is required"),
});


function CreateIdeaSubForm(props) {

    const { onClose, onCreate, submissionTitle } = props;
    const [dataDateRangePicker, setDataDateRangePicker] = useState([null, null]);
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            // const newValue = {...values, initial_date: dataDateRangePicker[0], final_date: dataDateRangePicker[1]}
            // onCreate(newValue)
            console.log(values, 98975)
        },
    });

    const renderFormDate = (startProps, endProps) => {
        return <React.Fragment>
            <div className="form_content" style={{width: '100%'}}>
                <InputLabel required htmlFor="initial_date" >
                    Initial Date
                </InputLabel>
                <TextField
                    fullWidth
                    {...startProps}
                    required={true}
                    label={null}
                    type={"date"}
                    margin="normal"
                    id="initial_date"
                    name="initial_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <Box sx={{ mx: 3 }} style={{marginBottom: 8, marginTop: 'auto', height: 56, paddingBottom: 15, paddingTop: 15}}> to </Box>
            <div className="form_content" style={{width: '100%'}}>
                <InputLabel required htmlFor="final_date">
                    Final Date
                </InputLabel>
                <TextField
                    fullWidth
                    {...endProps}
                    label={null}
                    required={true}
                    type={"date"}
                    margin="normal"
                    id="final_date"
                    name="final_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
        </React.Fragment>
    }
    const useStyles = makeStyles(theme => createStyles({
        previewChip: {
            minWidth: 160,
            maxWidth: 210
        },

    }));
    return (
        <div className="createuserform">
            <div className="createuserform_title">
                <h2>Create Idea</h2>
                <IconButton>
                    <CloseIcon onClick={() => onClose()} />
                </IconButton>
            </div>
            <br />

            <form
                className="form_grid"
                onSubmit={formik.handleSubmit}
            >
                <div className="form_group">
                    <div className="form_content">
                        <InputLabel htmlFor="full_name">
                            Title Submission
                        </InputLabel>
                        <CssTextField
                            fullWidth
                            margin="normal"
                            id="titleSub"
                            name="titleSub"
                            value={submissionTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                                readOnly: true,
                            }}
                            // error={formik.touched.title && Boolean(formik.errors.title)}
                            // helperText={formik.touched.title && formik.errors.title}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <div className="form_content">
                        <InputLabel required={true} htmlFor="full_name">
                            Title Idea
                        </InputLabel>
                        <CssTextField
                            fullWidth
                            margin="normal"
                            id="title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // error={formik.touched.title && Boolean(formik.errors.title)}
                            // helperText={formik.touched.title && formik.errors.title}
                        />
                    </div>
                    <div className="form_content">
                        <InputLabel required={true} htmlFor="full_name">
                            Content Idea
                        </InputLabel>
                        <CssTextField
                            fullWidth
                            margin="normal"
                            id="content"
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // error={formik.touched.title && Boolean(formik.errors.title)}
                            // helperText={formik.touched.title && formik.errors.title}
                        />
                    </div>
                </div>

                <div className="form_group">
                    <div className="form_content">
                        <InputLabel htmlFor="description">
                            Description
                        </InputLabel>
                        <TextareaAutosize
                            className='description-field'
                            aria-label="minimum height"
                            id="description"
                            name="description"
                            minRows={6}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%',marginTop: 16, marginBottom: 8, borderRadius: "5px",}}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <div className="form_content edit-input-file">
                        <DropzoneArea
                            showPreviews={true}
                            initialFiles={['https://drive.google.com/file/d/1j01Gc7r27V5vkEExy9OJwcs5SEkCEuHC',]}
                            showPreviewsInDropzone={false}
                            onChange={(value) => console.log(value , 'value')}
                            useChipsForPreview
                            showAlerts={false}
                            clearOnUnmount={false}
                            filesLimit={5}
                            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                            // previewChipProps={{classes: { root: classes.previewChip } }}
                            previewText="Selected files"
                        />
                    </div>
                </div>
                <div className="createuserform_footer">
                    <ColorButton variant="outlined" onClick={() => onClose()}>
                        Cancel
                    </ColorButton>
                    <ColorButton variant="contained" type="submit">
                        Create
                    </ColorButton>
                </div>
            </form>
        </div>
    );
}

export default React.memo(CreateIdeaSubForm);
