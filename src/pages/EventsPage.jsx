import { useEffect, useState } from 'react';
import { MainLayout } from '../layouts';
import { Grid, Box } from '@mui/material';
import { useFetch, useLocalStorage } from '../hooks';
import { EventCard, EventCardSkeleton } from '../components';
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

  // check time overlap
  const checkOverlap = (item) => {
    const selectedEvents =
      (data &&
        Array.isArray(data) &&
        data.filter((item) => selected.includes(item.id))) ||
      [];

    return (
      !selected.includes(item.id) &&
      selectedEvents.some((ev) => timespanOverlapWithOne(ev, item))
    );
  };

  // check if max selection number reached
  useEffect(() => {
    selected.length >= 3 &&
      enqueueSnackbar({
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: `You reached maximum number of registration`,
      });
  }, [selected]);

  // check if error occured during url fetch
  useEffect(() => {
    error &&
      enqueueSnackbar({
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: `An error occured during API fetch. ${error.message}`,
      });
  }, [error]);

  return (
    <MainLayout>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item md={8} xs={12} sx={{ p: 2 }}>
          <Box sx={{ mx: 2, my: 0 }} component="h3">
            All Events
          </Box>
          {loading && (
            <Grid container sx={{ flexGrow: 1, ml: 1 }} width="100%">
              {Array.from({ length: 6 }).map((_, index) => (
                <EventCardSkeleton key={index}></EventCardSkeleton>
              ))}
            </Grid>
          )}
          {!loading && (
            <Grid container sx={{ flexGrow: 1 }}>
              {data &&
                Array.isArray(data) &&
                data.map((item, key) => (
                  <Grid
                    item
                    key={key}
                    xl={3}
                    lg={4}
                    md={6}
                    xs={12}
                    sx={{ p: 1 }}
                  >
                    <EventCard
                      name={item.event_name}
                      category={item.event_category}
                      id={item.id}
                      start={new Date(item.start_time)}
                      end={new Date(item.end_time)}
                      sx={{ width: 100 }}
                      selected={selected && selected.includes(item.id)}
                      overlapped={checkOverlap(item)}
                      limited={
                        selected.length >= 3 && !selected.includes(item.id)
                      }
                      select={selectEvent}
                      remove={removeEvent}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{ p: 2, top: 100, backgroundColor: 'primary.selectedback' }}
          position="sticky"
        >
          <Box sx={{ mx: 2, my: 0 }} component="h3">
            Selected Events
          </Box>
          {loading && (
            <Grid container sx={{ flexGrow: 1, ml: 1 }} width="100%">
              {Array.from({ length: 2 }).map((_, index) => (
                <EventCardSkeleton key={index}></EventCardSkeleton>
              ))}
            </Grid>
          )}
          {!loading && (
            <Grid container sx={{ flexGrow: 1 }}>
              {data &&
                Array.isArray(data) &&
                data.map(
                  (item, key) =>
                    selected.includes(item.id) && (
                      <Grid item key={key} xs={12} xl={6} sx={{ p: 1 }}>
                        <EventCard
                          name={item.event_name}
                          category={item.event_category}
                          id={item.id}
                          start={new Date(item.start_time)}
                          end={new Date(item.end_time)}
                          sx={{ width: 100 }}
                          selected={selected && selected.includes(item.id)}
                          overlapped={checkOverlap(item)}
                          limited={
                            selected.length >= 3 && !selected.includes(item.id)
                          }
                          select={selectEvent}
                          remove={removeEvent}
                        />
                      </Grid>
                    )
                )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default EventsPage;
