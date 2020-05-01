import React, { useState, useEffect } from 'react';
import './table.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

const Countries = () => {
    class Api {
        async getData() {
            const res = await fetch('https://api.covid19api.com/summary');
            return await res.json();
        }

        getSummary() {
            return this.getData();
        }
    }
    const api = new Api();

    const [countries, setCountries] = useState([]);
    const [hint, targetValue] = useState('');

    useEffect(() => {
        api.getSummary()
            .then((data) => {
                setCountries(data['Countries']);
            });
    }, []);

    const search = (items, hint) => {
        if (hint.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item['Country'].toLowerCase().indexOf(hint.toLowerCase()) > -1;
        });

    }
    const toggle = search(countries, hint);
    const target = (event) => {
        const searchCountry = event.target.value;
        targetValue(searchCountry);
    }

    toggle.sort((a, b) => {
        const confirmedA = parseInt(a['TotalConfirmed']);
        const confirmedB = parseInt(b['TotalConfirmed']);

        let sort = 0;
        if (confirmedA > confirmedB) {
            sort = -1;
        } else if (confirmedA < confirmedB) {
            sort = 1;
        }
        return sort;
    });
    const classes = useStyles();

    const tableBody = toggle.map((country) => {
        return (
            <TableBody>
                <TableRow key={country['CountryCode']}>
                    <TableCell component="th" scope="row">
                        {country['Country']}
                    </TableCell>
                    <TableCell>{country['NewConfirmed']}</TableCell>
                    <TableCell>{country['TotalConfirmed']}</TableCell>
                    <TableCell>{country['NewDeaths']}</TableCell>
                    <TableCell>{country['NewRecovered']}</TableCell>
                    <TableCell>{country['TotalDeaths']}</TableCell>
                    <TableCell>{country['TotalRecovered']}</TableCell>
                </TableRow>
            </TableBody>
        );
    });


    return (
        <div className="search">
            <input
                value={hint} type="text"
                placeholder="Country"
                onChange={target} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>Country</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>NewConfirmed</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>TotalConfirmed</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>NewDeaths</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>NewRecovered</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>TotalDeaths</TableCell>
                            <TableCell   style={{fontWeight:'bold'}}>TotalRecovered</TableCell>
                        </TableRow>
                    </TableHead>
                    {tableBody}

                </Table>
            </TableContainer>
        </div>
    );

}

export default Countries;