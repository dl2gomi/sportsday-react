import { useState } from 'react';
import { MainLayout } from '../layouts';
import { Grid } from '@mui/material';
import { useFetch } from '../hooks';
import { EventCard } from '../components';

const EventsPage = ({}) => {
  // fetch events data from the url
  const { data, loading, error } = useFetch({
    url: import.meta.env.VITE_EVENTS_API_URL,
  });

  // fetch selected data from the local storage

  return (
    <MainLayout>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item sm={8} xs={12} sx={{ p: 2 }}>
          <Grid container sx={{ flexGrow: 1 }}>
            {data &&
              Array.isArray(data) &&
              data.map((item, key) => (
                <Grid item key={key} lg={4} md={6} xs={12} sx={{ p: 1 }}>
                  <EventCard
                    name={item.event_name}
                    category={item.event_category}
                    id={item.id}
                    start={new Date(item.start_time)}
                    end={new Date(item.end_time)}
                    sx={{ width: 100 }}
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
