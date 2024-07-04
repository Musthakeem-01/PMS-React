
import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];

export default function ColorPickerModal({ onColorChange })
{
    const [open, setOpen] = useState(false);

  const handleColorClick = (color) => {
    onColorChange(color);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Choose Color
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => handleColorClick(color)}
              style={{ backgroundColor: color, margin: '5px', color: '#fff' }}
            >
              {color}
            </Button>
          ))}
        </Box>
      </Modal>
    </>
  );
}

