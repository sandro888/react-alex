import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    color: 'gray',
    height: '70px',
    marginTop: theme.spacing(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
},

card: {
    width: '30%',
    display: 'block',
    minWidth: '300px',
    flexDirection: 'column',
    borderRadius: '25px',
    cursor: 'pointer',
    backgroundColor:'#f5f5f5',
    height:'150px',
    maxHeight: '200%',
    paddingTop:'15px',
},
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [stats, handleStats] = useState([]);
  useEffect(() => {
      FetchData()
  }, [])
  const FetchData = async () => {
      const data = await fetch('https://disease.sh/v2/countries/georgia'); 
      const stats = await data.json()
      console.log(stats)
      handleStats(stats)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formatter = new Intl.NumberFormat('en')
    console.log(formatter.format(stats.cases))

  const body = (
    <React.Fragment>
    <CssBaseline />
    <main>
    
        <Container className={classes.cardGrid} >
            <Grid container justify="space-between"  className="grid-modal">

                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                                CASES
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>
                                {formatter.format(stats.cases)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>
                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                                ACTIVE CASES
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>
                                {formatter.format(stats.active)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>
                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                            TODAY CASES
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>

                                {formatter.format(stats.todayCases)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>
            
            </Grid>
                <br/>
                <br/>
            <Grid container justify="space-between" className="grid-modal">
            <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                                DEATH RATE
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>
                                {formatter.format(stats.deaths)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>

                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                                RECOVERED
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>
                                {formatter.format(stats.recovered)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>
                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        <CardMedia className={classes.cardMedia} align="center" >
                            <Typography className="color" style={{ fontSize: '22px' }}>
                                TESTS
              </Typography>
                            <Typography style={{ fontSize: '35px' }}>
                                {formatter.format(stats.tests)}
                            </Typography>
                        </CardMedia>
                    </CardContent>
                </Card>
              
                
            </Grid>
           
        </Container>
       
    </main>
</React.Fragment>
  );

  return (
    <div>
      <button type="button" className="modal-btn" onClick={handleOpen}>
        Georgia Live
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}