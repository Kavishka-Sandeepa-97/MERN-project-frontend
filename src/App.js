import { Button, TextField } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red, blue, green} from '@mui/material/colors';


function App() {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  return (
    <div>
      <p>User Form</p>
      <TextField id="standard-basic" label="User id" variant="standard" /> <br></br>
      <TextField id="standard-basic" label="User Name" variant="standard" />
      <br></br><br></br>
      <Button variant="contained" sx={{backgroundColor:blue[500]}}>Submit</Button>
      <br></br><br></br>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>user id</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Update</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.calories}</StyledTableCell>
              <StyledTableCell ><Button variant="contained" sx={{backgroundColor:green[500]}}>Update</Button></StyledTableCell>
              <StyledTableCell ><Button variant="contained" sx={{backgroundColor:red[500]}}>Delete</Button></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default App
