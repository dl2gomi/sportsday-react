import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Skeleton,
} from '@mui/material';

const EventCardSkeleton = () => {
  return (
    <Card
      sx={{
        backgroundColor: 'primary.cardback',
        width: '45%',
        mr: '2%',
        my: 1,
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        sx={{ p: 2, pb: 1, color: 'primary.fore' }}
      />
      <CardContent sx={{ p: 2, py: 1 }}>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default EventCardSkeleton;
