import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import {
  PlayCircleFilled as StartIcon,
  StopCircle as EndIcon,
  CheckCircleRounded as SelectIcon,
  RemoveCircleRounded as RemoveIcon,
  ReportProblem as ReportIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { purple, red } from '@mui/material/colors';
import { useSnackbar } from 'notistack';

const EventCard = ({
  name,
  id,
  category,
  start,
  end,
  selected = false,
  overlapped = false,
  limited = false,
  select,
  remove,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card
      sx={{
        backgroundColor: !selected
          ? 'primary.cardback'
          : 'primary.cardselected',
        color: 'primary.fore',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor:
                purple[
                  Math.floor(
                    ((category.toUpperCase().charCodeAt(0) - 65) * 25 + 300) /
                      100
                  ) * 100
                ],
              width: 50,
              height: 50,
            }}
            aria-label="recipe"
          >
            {category[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography noWrap sx={{ fontSize: 18 }}>
            {name}
          </Typography>
        }
        subheader={
          <Typography noWrap sx={{ color: 'primary.hoverfore' }}>
            {category}
          </Typography>
        }
        sx={{ p: 2, pb: 1, color: 'primary.fore' }}
      />
      <CardContent sx={{ p: 2, py: 1 }}>
        <Box
          sx={{ display: 'flex', my: 0.2 }}
          alignItems="center"
          title="Start time"
        >
          <StartIcon sx={{ mr: 2 }}></StartIcon>
          <Typography variant="body2" noWrap>
            {start.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', my: 0.2 }}
          alignItems="center"
          title="End time"
        >
          <EndIcon sx={{ mr: 2 }}></EndIcon>
          <Typography variant="body2" noWrap>
            {end.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Box
          sx={{ flexGrow: 1, px: 2, display: 'flex', color: red[400] }}
          color="warning"
          alignItems="center"
        >
          {overlapped && (
            <>
              <ReportIcon sx={{ fontSize: 18, mr: 0.5 }}></ReportIcon>
              <Typography sx={{ fontSize: 12 }} noWrap>
                Time Overlap
              </Typography>
            </>
          )}
        </Box>
        {!selected && (
          <Button
            disabled={overlapped || limited}
            variant="contained"
            startIcon={<SelectIcon />}
            color="secondary"
            sx={{
              '&:focus': {
                outline: 'none',
              },
            }}
            onClick={() => {
              enqueueSnackbar({
                variant: 'success',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                message: `You registered this event: ${name}`,
              });
              select(id);
            }}
          >
            Select
          </Button>
        )}
        {selected && (
          <Button
            disabled={overlapped || limited}
            variant="contained"
            startIcon={<RemoveIcon />}
            color="warning"
            sx={{
              '&:focus': {
                outline: 'none',
              },
            }}
            onClick={() => {
              enqueueSnackbar({
                variant: 'warning',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                message: `You unregistered this event: ${name}`,
              });
              remove(id);
            }}
          >
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.bool,
  overlapped: PropTypes.bool,
  limited: PropTypes.bool,
  select: PropTypes.func,
  remove: PropTypes.func,
};

export default EventCard;
