import { Star } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  CardActions,
  IconButton,
  Box,
} from '@mui/material';
import {
  PlayCircleFilled as StartIcon,
  StopCircle as EndIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { purple } from '@mui/material/colors';

const EventCard = ({ name, id, category, start, end }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'primary.cardback',
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
          <Typography variant="body2">{start.toLocaleString()}</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', my: 0.2 }}
          alignItems="center"
          title="End time"
        >
          <EndIcon sx={{ mr: 2 }}></EndIcon>
          <Typography variant="body2">{end.toLocaleString()}</Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
};

export default EventCard;
