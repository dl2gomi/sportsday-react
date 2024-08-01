import { useEffect, useState } from 'react';
import { MainLayout } from '../layouts';
import { Grid } from '@mui/material';
import { useFetch, useLocalStorage } from '../hooks';
import { EventCard } from '../components';
import { useSnackbar } from 'notistack';

const EventsPage = ({}) => {
  const { enqueueSnackbar } = useSnackbar();

  // fetch events data from the url
  const { data, loading, error } = useFetch({
    url: import.meta.env.VITE_EVENTS_API_URL,
  });

  // fetch selected data from the local storage
  const [selected, setSelected, selectEvent, removeEvent] = useLocalStorage(
    'selected_events',
    []
  );

  // Define a function to check time overlap
  const timespanOverlapWithOne = (event1, event2) => {
    // Each timespan is expected to be an array of [startTime, endTime]
    let { start_time: start1, end_time: end1 } = event1;
    let { start_time: start2, end_time: end2 } = event2;

    // Convert times to Date objects if they are not already
    start1 = new Date(start1);
    end1 = new Date(end1);
    start2 = new Date(start2);
    end2 = new Date(end2);

    // Check for overlap
    return start1 < end2 && start2 < end1;
  };

  const checkDisable = (item) => {
    const selectedEvents =
      (data &&
        Array.isArray(data) &&
        data.filter((item) => selected.includes(item.id))) ||
      [];

    return (
      !selected.includes(item.id) &&
      (selected.length >= 3 ||
        selectedEvents.some((ev) => timespanOverlapWithOne(ev, item)))
    );
  };

  useEffect(() => {
    selected.length >= 3 &&
      enqueueSnackbar({
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: `You reached maximum number of registration`,
      });
  }, [selected]);
  return (
    <MainLayout>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item sm={8} xs={12} sx={{ p: 2 }}>
          <Grid container sx={{ flexGrow: 1 }}>
            {data &&
              Array.isArray(data) &&
              data.map((item, key) => (
                <Grid item key={key} xl={3} lg={4} md={6} xs={12} sx={{ p: 1 }}>
                  <EventCard
                    name={item.event_name}
                    category={item.event_category}
                    id={item.id}
                    start={new Date(item.start_time)}
                    end={new Date(item.end_time)}
                    sx={{ width: 100 }}
                    selected={selected && selected.includes(item.id)}
                    disabled={checkDisable(item)}
                    select={selectEvent}
                    remove={removeEvent}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} sx={{ p: 2 }}>
          {JSON.stringify(data)}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default EventsPage;
