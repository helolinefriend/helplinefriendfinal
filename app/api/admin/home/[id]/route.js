import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Home from '../../../../../models/Ahome';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const homeData = await req.json();
    const { id } = params; // Extract the ID from the URL

    const updatedHome = await Home.findByIdAndUpdate(
      id,
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

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params; // Extract the ID from the URL
    const homeData = await Home.findById(id);
    
    if (!homeData) {
      return NextResponse.json({ message: 'Home data not found' }, { status: 404 });
    }

    return NextResponse.json(homeData);
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json(
      { message: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
