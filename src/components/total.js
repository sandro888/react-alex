//importing packages starts here
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
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
        borderRadius: '35px',
        cursor: 'pointer',
        backgroundColor:'#f5f5f5',
        height:'200px',
        maxHeight: '200%',
        paddingTop:'25px',
    },
  

}));

export default function Cards() {
    const classes = useStyles();
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

    const formatter = new Intl.NumberFormat('en')
    console.log(formatter.format(stats.cases))

    return (
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
                                        COUNTRIES
                      </Typography>
                                    <Typography style={{ fontSize: '35px' }}>

                                        {formatter.format(stats.affectedCountries)}
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
}







