import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red, blue, green } from '@mui/material/colors';
import axios from 'axios';
import { useEffect } from 'react';

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

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({
    id: '',
    name: ''
  })
  const [open,setOpen]=React.useState(false);

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      const users = response.data.response;
      setUsers(users);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const userInputHndle = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    }
    )
  }
  const formSubmit = async () => {

    try {
      const response = await axios.post('http://localhost:3001/api/createUser', user)

      setUser({ id: '', name: '' })
      if (response) {
        handleOpen();
      }
      fetchUsers();
      console.log(response.data);
    } catch (error) {
      console.log("error message >", error);
    }
  }

  const deleteUser = async (id) => {
    let user = { id };
    console.log(user);
    try {
      const response = await axios.delete('http://localhost:3001/api/deleteUser', {
        data: { id }
      })
      fetchUsers();
      console.log(response.data);
    } catch (error) {
      console.log("error message >", error);
    }
  }

  const handleOpen=()=>{setOpen(true)}
  const handleClose=()=>{setOpen(false)}

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };



  return (
    <div>
      <p>User Form</p>
      <TextField id="standard-basic" label="User id" variant="standard" onChange={userInputHndle} value={user.id} name='id' type='number' /> <br></br>
      <TextField id="standard-basic" label="User Name" variant="standard" onChange={userInputHndle} value={user.name} name='name' />
      <br></br><br></br>
      <Button variant="contained" sx={{ backgroundColor: blue[500] }} onClick={formSubmit}>Submit</Button>
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
            {users.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell >{row.id}</StyledTableCell>
                <StyledTableCell >{row.name}</StyledTableCell>
                <StyledTableCell ><Button variant="contained" sx={{ backgroundColor: green[500] }}>Update</Button></StyledTableCell>
                <StyledTableCell ><Button variant="contained" sx={{ backgroundColor: red[500] }} onClick={() => { deleteUser(row.id) }}>Delete</Button ></StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Adedd Successfully !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleClose}>close</Button>
          </Typography>
        </Box>
      </Modal>

    </div>
  )
}

export default App
