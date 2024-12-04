import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Inputs } from '../tools/type';
import { useForm, SubmitHandler } from 'react-hook-form';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import './user.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  id: string;
  fetchUsers: () => Promise<void>;
};

export default function BasicModal({ id, fetchUsers }: BasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const BaseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${BaseUrl}user?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    handleClose();
    fetchUsers();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<KeyboardReturnIcon />}
        onClick={handleOpen}
      >
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Add User</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="formStyle"
              placeholder="User Name"
              {...register('userName', { required: true })}
            />
            {errors.userName && <span>This field is required</span>}
            <input
              className="formStyle"
              placeholder="User Email"
              {...register('userEmail', { required: true })}
            />
            {errors.userEmail && <span>This field is required</span>}
            <input
              className="formStyle"
              placeholder="Age"
              {...register('age', { required: true })}
            />
            {errors.age && <span>This field is required</span>}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<SendIcon />}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
