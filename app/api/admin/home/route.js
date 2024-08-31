import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Home from '../../../../models/Ahome';

 

export async function GET() {
  try {
    await connectToDatabase();
    const homeData = await Home.findOne();
    
    // If no data found, create default data
    if (!homeData) {
      const defaultHome = new Home({
        title: 'Welcome to our website!' ,
        subtitle: 'We are glad to have you here.',
        imageUrl: ''
      });

      await defaultHome.save();
      return NextResponse.json(defaultHome);
    }

    return NextResponse.json(homeData);
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// export async function PUT(req) {
//   const homeData = await req.json();

//   try {
//     await connectToDatabase();
     
//     // Provide default values if fields are null or undefined
//     const updatedHome = await Home.findOneAndUpdate(
//       {},
//       {
//         ...homeData, // Spread the homeData object to update all fields
//       },
//       { new: true, upsert: true } // upsert: true creates a new document if no matching document is found
//     );
    
//     return NextResponse.json(updatedHome);
//   } catch (error) {
//     console.error('Error updating home data:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }


// export async function PUT(req) {
//   if (req.method !== 'PUT') {
//     return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
//   }

//   try {
//     // Attempt to connect to the database
//     await connectToDatabase();

//     // Parse the incoming request data
//     const homeData = await req.json();

//     // Update the Home document or create a new one if it doesn't exist
//     const updatedHome = await Home.findOneAndUpdate(
//       {},
//       { ...homeData }, // Update all fields with the provided data
//       { new: true, upsert: true } // Return the new document if it was created
//     );

//     // Return the updated document as a JSON response
//     return NextResponse.json(updatedHome);
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error('Error updating home data:', error);

//     // Return more specific error responses based on the error type
//     if (error.name === 'ValidationError') {
//       return NextResponse.json(
//         { message: 'Validation Error: ' + error.message },
//         { status: 400 } // Bad Request
//       );
//     } else if (error.name === 'MongoNetworkError') {
//       return NextResponse.json(
//         { message: 'Database Connection Error: ' + error.message },
//         { status: 503 } // Service Unavailable
//       );
//     } else {
//       return NextResponse.json(
//         { message: 'Internal Server Error: ' + error.message },
//         { status: 500 } // Internal Server Error
//       );
//     }
//   }
// }



export async function PUT(req) {
  try {
    await connectToDatabase();
    const homeData = await req.json();

    const updatedHome = await Home.findOneAndUpdate(
      {},
      { ...homeData },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedHome);
  } catch (error) {
    console.error('Error updating home data:', error);
    return NextResponse.json(
      { message: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
