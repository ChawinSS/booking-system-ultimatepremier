import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createBooking, updateHotelRoom } from '@/libs/apis';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('Missing signature or webhook secret');
      return new NextResponse('Missing signature or webhook secret', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  try {
    console.log('Received event:', event);

    // Handle the event
    switch (event.type) {
      case checkout_session_completed:
        const session = event.data.object as Stripe.Checkout.Session;

        console.log('Checkout session:', session);

        const metadata = session.metadata;
        console.log('Metadata:', metadata);

        const {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        } = metadata;

        console.log('Extracted metadata:', {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        });

        // Create booking
        try {
          await createBooking({
            adults: Number(adults),
            checkinDate,
            checkoutDate,
            children: Number(children),
            hotelRoom,
            numberOfDays: Number(numberOfDays),
            discount: Number(discount),
            totalPrice: Number(totalPrice),
            user,
          });
          console.log('Booking created successfully');
        } catch (error: any) {
          console.error(`Error creating booking: ${error.message}`);
          return new NextResponse(`Error creating booking: ${error.message}`, { status: 500 });
        }

        // Update hotel Room
        try {
          await updateHotelRoom(hotelRoom);
          console.log('Hotel room updated successfully');
        } catch (error: any) {
          console.error(`Error updating hotel room: ${error.message}`);
          console.error('Request failed with status code:', error.response?.status);
          console.error('Response data:', error.response?.data);
          console.error('Response headers:', error.response?.headers);
          return new NextResponse(`Error updating hotel room: ${error.message}`, { status: 500 });
        }

        return NextResponse.json('Booking successful', {
          status: 200,
          statusText: 'Booking Successful',
        });

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json('Event Received', {
      status: 200,
      statusText: 'Event Received',
    });
  } catch (error: any) {
    console.error(`Error handling event: ${error.message}`);
    return new NextResponse(`Error handling event: ${error.message}`, { status: 500 });
  }
}
