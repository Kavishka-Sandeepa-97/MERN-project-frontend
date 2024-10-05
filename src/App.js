import { Box, Button, Modal, TextField, Typography } from '@mui/material';
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({ id: '', name: '' });
  const [open, setOpen] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState({
    id: '',
    name: '',
  });

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_ENDPOINT+'api/users');
      setUsers(response.data.response);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const userInputHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_ENDPOINT+'api/createUser', user);
      if (response) {
        setUser({ id: '', name: '' });
        setOpen(true);
        fetchUsers();
      }
    } catch (error) {
      console.log('Error message >', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_ENDPOINT+'api/deleteUser', {data:{id}});
      fetchUsers();
    } catch (error) {
      console.log('Error message >', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(process.env.REACT_APP_ENDPOINT+'api/updateUser', selectedUser);
      setOpenUpdateModal(false);
      fetchUsers();
    } catch (error) {
      console.log('Error message >', error);
    }
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  const handleCloseSubmitModal = () => setOpen(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

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
      <TextField
        id="standard-basic"
        label="User id"
        variant="standard"
        onChange={userInputHandle}
        value={user.id}
        name="id"
        type="number"
      />
      <br />
      <TextField
        id="standard-basic"
        label="User Name"
        variant="standard"
        onChange={userInputHandle}
        value={user.name}
        name="name"
      />
      <br /> <br />
      <Button variant="contained" sx={{ backgroundColor: blue[500] }} onClick={formSubmit}>
        Submit
      </Button>
      <br /> <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: green[500] }}
                    onClick={() => handleOpenUpdateModal(row)}
                  >
                    Update
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: red[500] }}
                    onClick={() => deleteUser(row.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit Success Modal */}
      <Modal open={open} onClose={handleCloseSubmitModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Submitted Successfully!
          </Typography>
          <Button onClick={handleCloseSubmitModal}>Close</Button>
        </Box>
      </Modal>

      {/* Update User Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={style}>
          <Typography variant="h6">Update User</Typography>
          <TextField
            label="User ID"
            variant="standard"
            value={selectedUser.id}
            name="id"
            type="number"
            disabled
          />
          <TextField
            label="User Name"
            variant="standard"
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            value={selectedUser.name}
            name="name"
          />
          <Button onClick={handleCloseUpdateModal}>Close</Button>
          <Button onClick={updateUser}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
