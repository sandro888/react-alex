//importing packages starts here
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function SimpleGrow() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [stats, handleStats] = useState([]);

  useEffect(() => {
    FetchData()
  }, [])
  const FetchData = async () => {
    const data = await fetch('https://disease.sh/v2/all');
    const stats = await data.json()
    console.log(stats)
    handleStats(stats)
  }
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const formatter = new Intl.NumberFormat('en')
  console.log(formatter.format(stats.cases))
  return (
    <div className={classes.root}>
      <FormControlLabel
        style={{ textAlign: 'center', display: 'block' }}
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show Additional Data"
      />
      <div className={classes.container} >
        <Grow in={checked}

          style={{
            transformOrigin: '0 0 0', width: '90%', height: '100px',
            borderRadius: ' 10px',
            paddingTop: '10px'
          }}>
          <Paper elevation={4} className={classes.paper}>
            <Typography className="color" style={{ textAlign: 'center', fontSize: '22px' }}>
              Critical Cases
                      </Typography>
            <Typography style={{ textAlign: 'center', fontSize: '30px' }}>
              {formatter.format(stats.critical)}
            </Typography>
          </Paper>
        </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{
            transformOrigin: '0 0 0', width: '90%', height: '100px',
            borderRadius: ' 10px',
            paddingTop: '10px'
          }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <Typography className="color" style={{ textAlign: 'center', fontSize: '22px' }}>
              Todays Cases
                      </Typography>
            <Typography style={{ textAlign: 'center', fontSize: '30px' }}>
              {formatter.format(stats.todayCases)}
            </Typography>

          </Paper>
        </Grow>
        <Grow
          in={checked}
          style={{
            transformOrigin: '0 0 0', width: '90%', height: '100px',
            borderRadius: ' 10px',
            paddingTop: '10px'
          }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <Typography className="color" style={{ textAlign: 'center', fontSize: '22px' }}>
              Tests Per OneMillion
                      </Typography>
            <Typography style={{ textAlign: 'center', fontSize: '30px' }}>
              {formatter.format(stats.testsPerOneMillion)}
            </Typography>

          </Paper>
        </Grow>
        <Grow
          in={checked}
          style={{
            transformOrigin: '0 0 0', width: '90%', height: '100px',
            borderRadius: ' 10px',
            paddingTop: '10px'
          }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <Typography className="color" style={{ textAlign: 'center', fontSize: '22px' }}>
              Deaths Per OneMillion
                      </Typography>
            <Typography style={{ textAlign: 'center', fontSize: '30px' }}>
              {formatter.format(stats.deathsPerOneMillion)}
            </Typography>

          </Paper>
        </Grow>
      </div>
    </div>
  );
}