import Stripe from 'stripe';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getRoom } from '@/libs/apis';

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Session = {
  user?: User;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request) {
  try {
    console.log('Parsing request body...');
    const data: RequestData = await req.json();
    console.log('Request data:', data);

    const {
      checkinDate,
      checkoutDate,
      adults,
      children,
      hotelRoomSlug,
      numberOfDays,
    } = data;

    // Validate request data
    if (!checkinDate || !checkoutDate || !adults || !hotelRoomSlug || !numberOfDays) {
      console.error('Missing required fields');
      return new NextResponse('All fields are required', { status: 400 });
    }

    const origin = req.headers.get('origin');
    if (!origin) {
      console.error('Origin header is missing');
      return new NextResponse('Origin header is missing', { status: 400 });
    }

    // Get user session
    console.log('Getting user session...');
    const session: Session | null = await getServerSession(authOptions);
    console.log('Session:', session);
    if (!session || !session.user || !session.user.id) {
      console.error('Authentication required');
      return new NextResponse('Authentication required', { status: 401 });
    }

    const userId = session.user.id;
    const formattedCheckoutDate = checkoutDate.split('T')[0];
    const formattedCheckinDate = checkinDate.split('T')[0];

    // Get room details
    console.log('Getting room details...');
    const room = await getRoom(hotelRoomSlug);
    if (!room) {
      console.error('Room not found');
      return new NextResponse('Room not found', { status: 404 });
    }

    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Encode image URLs
    const encodedImages = room.images.map((image) => encodeURI(image.url));

    // Create Stripe payment session
    console.log('Creating Stripe payment session...');
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.name,
              images: encodedImages,
            },
            unit_amount: parseInt((totalPrice * 100).toFixed(0)),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: `${origin}/users/${userId}`,
      cancel_url: `${origin}/rooms/${hotelRoomSlug}`, // Add a cancel URL for completeness
      metadata: {
        adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice: totalPrice.toFixed(2), // Store total price as a string
      },
    });

    console.log('Stripe session created:', stripeSession);

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.error('Payment failed', error);
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
  }
}
