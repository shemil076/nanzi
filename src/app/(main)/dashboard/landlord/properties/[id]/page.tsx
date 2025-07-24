'use client';
import { use } from 'react';
import ParentContainer from './components/parent-container';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

const PropertyPage = ({ params }: PropertyPageProps) => {
  const { id } = use(params);
  if (!id) {
    return null;
  }
  return (
    <div>
      <ParentContainer id={id}/>
    </div>
  );
};

export default PropertyPage;
