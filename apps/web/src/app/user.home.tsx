import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, ReceiveUserList, UpdateUserList } from '../tools/type';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BasicModal from './user.update.modal';

export default function User() {
  const [userList, setuserList] = useState<ReceiveUserList[]>([]);

  useEffect(() => {
    getList();
  }, []);
  const getList = async (): Promise<void> => {
    const BaseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${BaseUrl}user`);
    const result = await response.json();
    setuserList(result);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const BaseUrl =
      'https://user-management-backend-service-422041495987.asia-southeast1.run.app/api/';
    const response = await fetch(`${BaseUrl}user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    await getList();
  };

  async function deleteButton(id: string) {
    alert('are you sure you want to delete this item?');
    const baseUrl =
      'https://user-management-backend-service-422041495987.asia-southeast1.run.app/api/';
    try {
      const response = await fetch(`${baseUrl}user?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      await getList();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  return (
    <>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="User Name"
          {...register('userName', { required: true })}
        />
        {errors.userName && <span>This field is required</span>}
        <input
          placeholder="User Email"
          {...register('userEmail', { required: true })}
        />
        {errors.userEmail && <span>This field is required</span>}
        <input placeholder="Age" {...register('age', { required: true })} />
        {errors.age && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <h1>User Management</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User Id</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">User Email</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.userEmail}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>

                  <TableCell align="center">
                    <BasicModal id={row.id} fetchUsers={getList}></BasicModal>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => deleteButton(row.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
