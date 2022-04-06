import * as React from "react";
import Paper from "@mui/material/Paper";
import LineAxisIcon from '@mui/icons-material/LineAxis';
import IdeaPopularChart from "../../components/ChartDashboard/IdeaPopularChart";
import _ from "lodash"
import TotalSubmissionChart from "../../components/ChartDashboard/TotalSubmissionChart";
import {DateRangePicker, LocalizationProvider} from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
import {Grid, Slider, TextField} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useEffect, useState} from "react";
import moment from "moment";
import IdeaInfoChart from "../../components/ChartDashboard/IdeaInfoChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {dataIdeaInfo} from "../../components/ChartDashboard/FakeData";
import AddIcon from '@mui/icons-material/Add';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {CardMedia} from "@material-ui/core";
import {Item} from "devextreme-react/box";
import {styled} from "@mui/material/styles";
const dataFake = [
  {
    month: '1',
    submissionDeActive: 10,
    submissionActivity: 5,
  },
  {
    month: '2',
    submissionDeActive: 11,
    submissionActivity: 13,
  },
  {
    month: '3',
    submissionDeActive: 12,
    submissionActivity: 16,
  },
  {
    month: '4',
    submissionDeActive: 11,
    submissionActivity: 11,
  },
  {
    month: '5',
    submissionDeActive: 12,
    submissionActivity: 2,
  },
  {
    month: '6',
    submissionDeActive: 1,
    submissionActivity: 4,
  },
  {
    month: '7',
    submissionDeActive: 22,
    submissionActivity: 12,
  },
  {
    month: '8',
    submissionDeActive: 13,
    submissionActivity: 4,
  },
  {
    month: '9',
    submissionDeActive: 3,
    submissionActivity: 22,
  },
  {
    month: '10',
    submissionDeActive: 22,
    submissionActivity: 5,
  },
  {
    month: '11',
    submissionDeActive: 22,
    submissionActivity: 23,
  },
  {
    month: '12',
    submissionDeActive: 1,
    submissionActivity: 13,
  },
];
export default function Dashboard ()  {
  const [data, setData] = useState({
    totalSUb: dataFake,
    topIdea: [],
    ideaInfo: dataIdeaInfo
  })
  const [display, setDisplay] = useState({
    sub: [1, 6],
    ideaInfo: [1, 15]
  })
  let today = new Date();
  const [filter, setFilter] = useState({
    year: new Date( today.getFullYear(),0, 1),
    monthYearIdea: new Date( today.getFullYear(),0, 1),
    monthYearIdeaInfo: new Date( today.getFullYear(),0, 1)
  });


  useEffect(()=>{
    loadData()
  })
  const loadData = async () => {
      //api load Data
  }
  const onYearChange = (value) => {
    const newDate = new Date(value.getFullYear(),0, 1)
    setFilter({...filter, year: newDate, monthYearIdea: newDate, monthYearIdeaInfo: newDate})
    setDisplay({ ...display,
      sub: [1, 6],
      ideaInfo: [1, 15]
    })
    loadData()
  };
  const onMonthYearChange = (value) => {
    setFilter({...filter, monthYearIdea: value})
    //api load data top idea
    // setData({...data, topIdea: res?.data?.result})
  };
  const onMonthYearIdeaInfoChange = (value) => {
    setFilter({...filter, monthYearIdeaInfo: value})
    setDisplay({...display, ideaInfo: [1, 15]})
    //api load data top idea
    // setData({...data, topIdea: res?.data?.result})
  };

  const renderPickerYear = () => {
    return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
        <div style={{marginRight: 20, padding: 0, width: 150}}>
          <DatePicker
              inputFormat="yyyy"
              views={["year"]}
              label="Year"
              value={filter.year}
              onChange={(value) => {
                onYearChange(value);
              }}
              renderInput={(params) => <TextField  {...params} helperText={null} />}
          />
        </div>


        <div >
          <Box sx={{ width: 250, textAlign: "right", margin: 0 }}>
            <Typography id="input-slider" gutterBottom textAlign={"left"} style={{margin: 0}} >Month: {display.sub[0]} - {display.sub[1]}</Typography>
            <Slider
                aria-label="Small steps"
                value={display.sub}
                onChange={(value)=>{setDisplay({...display, sub: value?.target?.value})}}
                valueLabelDisplay="auto"
                disableSwap
                min={1}
                max={12}
                step={1}
            />
          </Box>
        </div>
      </div>
    </LocalizationProvider>
  }

  const renderPickerMonthYearInfoIdea = () => {
    return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
        <div style={{marginRight: 20, padding: 0, width: 150}}>
          <DatePicker
              inputFormat="MM/yyyy"
              views={["month"]}
              label="Month year"
              value={filter.monthYearIdeaInfo}
              onChange={(value) => {
                onMonthYearIdeaInfoChange(value);
              }}
              renderInput={(params) => <TextField  {...params} helperText={null} />}
          />
        </div>

        <div >
          <Box sx={{ width: 250, textAlign: "right", margin: 0 }}>
            <Typography id="input-slider" gutterBottom textAlign={"left"} style={{margin: 0}} >Day: {display.ideaInfo[0]} - {display.ideaInfo[1]}</Typography>
            <Slider
                aria-label="Small steps"
                value={display.ideaInfo}
                onChange={(value)=>{setDisplay({...display, ideaInfo: value?.target?.value})}}
                valueLabelDisplay="auto"
                disableSwap
                min={1}
                max={new Date(filter.monthYearIdeaInfo.getFullYear(), _.toNumber(moment(filter.monthYearIdeaInfo).format("MM")) , 0).getDate()}
                step={1}
            />
          </Box>
        </div>
      </div>
    </LocalizationProvider>
  }

  const renderPickerMonthYearIdea = () => {
    return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: 150 }}>
        <DatePicker
            inputFormat="MM/yyyy"
            views={["month"]}
            label="Month year"
            value={filter.monthYearIdea}
            onChange={(value) => {
              onMonthYearChange(value);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </div>
    </LocalizationProvider>
  }

  const renderChartSubmissionTotal = () => {
    return <Paper>
      <div style={{textAlign: "right", justifyContent: 'right',width: '100%', display: "flex", paddingTop: 10, paddingRight: 10,}}>
        {renderPickerYear()}
      </div>
      <TotalSubmissionChart timeKey={filter.year} data={dataFake} display={display.sub}/>
    </Paper>
  }

  const renderPopularIdea = () => {
    return <div style={{marginRight: 20, width: "100%", height: 300,}}>
      <Paper>
        <div style={{textAlign: "right", justifyContent: 'right',width: '100%', display: "flex", paddingTop: 10, paddingRight: 10, marginBottom: 10}}>
          {renderPickerMonthYearIdea()}
        </div>
        <IdeaPopularChart timeKey={filter.monthYearIdea} data={data.topIdea}/>
      </Paper>
    </div>
  }

  const  renderIdeaInfo = () => {
    return <div style={{marginLeft: 20, width: "100%"}}>
      <Paper>
        <div style={{textAlign: "right", justifyContent: 'right',width: '100%', display: "flex", paddingTop: 10, paddingRight: 10, marginBottom: 6}}>
          {renderPickerMonthYearInfoIdea()}
        </div>
        <IdeaInfoChart timeKey={filter.monthYearIdea} data={data.ideaInfo} display={display.ideaInfo}/>
      </Paper>
    </div>
  }
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === '#ffc107' ? '#ffc107' : '#ffc107',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const renderTop = () => {
    return <div style={{width: '100%', marginBottom: 20}}>
      <Typography style={{fontSize: 28, fontWeight: "bold"}}>Dashboard</Typography>
      <br></br>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 8, md: 16 }}>
            <Grid item xs={4} sm={4} md={4} >
              <Item style={{height: 100, backgroundColor: "#a1887f"}} >
                <h1 style={{fontSize: 20, fontWeight: "bold"}}>{_.toUpper("Total submission")}</h1>
                <span style={{fontSize: 32, fontWeight: "bold"}}>500</span>
              </Item>
            </Grid>
            <Grid  item xs={4} sm={4} md={4}>
              <Item style={{height: 100, backgroundColor: "#a1887f"}} >
                <h1 style={{fontSize: 20, fontWeight: "bold"}}>{_.toUpper("Total idea")}</h1>
                <span style={{fontSize: 32, fontWeight: "bold"}}>500</span>
              </Item>
            </Grid>
            <Grid  item xs={4} sm={4} md={4} >
              <Item style={{height: 100, backgroundColor: "#a1887f"}} >
                <h1 style={{fontSize: 20, fontWeight: "bold"}}>{_.toUpper("Total like")}</h1>
                <span style={{fontSize: 32, fontWeight: "bold"}}>500</span>
              </Item>
            </Grid>
            <Grid  item xs={4} sm={4} md={4} >
              <Item style={{height: 100, backgroundColor: "#a1887f"}} >
                <h1 style={{fontSize: 20, fontWeight: "bold"}}>{_.toUpper("Total dislike")}</h1>
                <span style={{fontSize: 32, fontWeight: "bold"}}>500</span>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>

    </div>
  }
  return (
      <div>
        {renderTop()}
        {renderChartSubmissionTotal()}
        <div style={{display: "flex", width: "100%",marginTop: 20}}>
          {renderPopularIdea()}
          {renderIdeaInfo()}
        </div>

      </div>

  );

}
