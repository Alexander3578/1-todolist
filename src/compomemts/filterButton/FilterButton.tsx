import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

interface IFilterButton extends ButtonProps {}

export const FilterButton = React.memo(({color, onClick, variant, children}: IFilterButton) => {
        return (
            <Button variant={variant}
                    color={color}
                    onClick={onClick}>
                {children}
            </Button>
        );
    }
)

