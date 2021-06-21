import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    container: {
        margin: '0px 50px 0px 0px',
    },
    autocomplete: {
        margin: theme.spacing(0),
        width: '90%',
        minWidth: 120,
    }
}));

const AirlineList = ['SKW'];
const MessagesList = ['Include', 'Exclude'];

export const AirlineOperatorSelector = (props) => {
    const classes = useStyles();
    const [airline, setAirline] = useState('');

    const handleAirlineChange = (event) => {
        setAirline(event.target.value);
        props.handleAirlineChange(event.target.value);
    };

    return ( <
        FormControl variant = "outlined"
        className = { classes.formControl } >
        <
        InputLabel id = "demo-simple-select-outlined-label" > Airline Operator < /InputLabel> <
        Select labelId = "demo-simple-select-outlined-label"
        id = "demo-simple-select-outlined"
        value = { airline }
        onChange = { handleAirlineChange }
        label = "Airline Operator" >
        <
        MenuItem value = "none" > < /MenuItem> {
            AirlineList.map(item =>
                <
                MenuItem value = { item }
                key = { item } > { item } < /MenuItem>
            )
        }; <
        /Select> <
        /FormControl>
    );
}

export const ATAMainSelector = (props) => {
    const classes = useStyles();
    const [ATAMain, setATAMain] = useState([]);
    const [ATAMainList, setATAMainList] = useState([]);
    useEffect(() => {
        const path = 'https://mhirjapi.azurewebsites.net/api/GenerateReport/ata_main/ALL'

        try {
            axios.post(path).then(function(res) {
                var data = JSON.parse(res.data);
                let ATAArray = ['ALL'];
                Object.values(data).map((item => {
                    ATAArray.push(item.ATA_Main.toString());
                }))
                setATAMainList(ATAArray);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleATAChange = (event, values) => {
        const ATAValues = [];
        if (values.includes("ALL")) {
            ATAValues.push("ALL");
            setATAMain(ATAValues);
            props.handleATAChange("ALL");
        } else {
            setATAMain(values);
            let ataList = Object.values(values).length > 0 ? "('" + values.join("','") + "')" : "";
            props.handleATAChange(ataList);
        }
    };

    return ( <
        Autocomplete className = { classes.autocomplete }
        multiple options = { ATAMainList }
        getOptionLabel = {
            (item => item) }
        value = { ATAMain }
        filterSelectedOptions onChange = { handleATAChange }
        renderInput = {
            (params) => ( <
                TextField {...params }
                variant = "outlined"
                label = "ATA Main"
                placeholder = "ATA Main" /
                >
            )
        }
        />
    );
}

export const EqIDSelector = (props) => {
    const classes = useStyles();
    const [EqID, setEqID] = useState([]);
    const [EqList, setEqIDList] = useState([]);
    useEffect(() => {
        const path = 'https://mhirjapi.azurewebsites.net/api/GenerateReport/equation_id/ALL'

        try {
            axios.post(path).then(function(res) {
                var data = JSON.parse(res.data);
                let EQArray = ['NONE'];
                Object.values(data).map((item => {
                    EQArray.push(item.Equation_ID.toString());
                }))
                setEqIDList(EQArray);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleEqIDChange = (event, values) => {
        const EqIDValues = [];
        if (values.includes("NONE")) {
            EqIDValues.push("NONE");
            setEqID(EqIDValues);
            props.handleEqIDChange("NONE");
        } else {
            setEqID(values);
            let eqIDLIST = Object.values(values).length > 0 ? "('" + values.join("','") + "')" : "";
            props.handleEqIDChange(eqIDLIST);
        }
    };

    return (

        <
        Autocomplete className = { classes.autocomplete }
        multiple options = { EqList }
        getOptionLabel = {
            (item => item) }
        value = { EqID }
        filterSelectedOptions onChange = { handleEqIDChange }
        searchEnabled = { true }
        renderInput = {
            (params) => ( <
                TextField {...params }
                variant = "outlined"
                label = "Exclude Equation ID"
                placeholder = "EqID" /
                >
            )
        }
        />
    );
};

export const MessagesSelector = (props) => {
    const classes = useStyles();
    const [messages, setIncludeMessages] = useState('');

    const handleMessagesChange = (event) => {
        let value = 0;
        if (event.target.value === 'Include') {
            value = 1;
        }
        setIncludeMessages(event.target.value);
        props.handleMessagesChange(value);
    };

    return ( <
        FormControl variant = "outlined"
        className = { classes.formControl } >
        <
        InputLabel id = "demo-simple-select-outlined-label" > Current Messages < /InputLabel> <
        Select labelId = "demo-simple-select-outlined-label"
        id = "demo-simple-select-outlined"
        value = { messages }
        onChange = { handleMessagesChange }
        label = "Current Messages" >
        <
        MenuItem value = "none" > < /MenuItem> {
            MessagesList.map(item =>
                <
                MenuItem value = { item }
                key = { item } > { item } < /MenuItem>
            )
        }; <
        /Select> <
        /FormControl>
    );
}

const Selectors = (props) => {

    return ( <
        div > < /div>
    );
};

export default Selectors;