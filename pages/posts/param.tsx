import * as React from 'react';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      params
    </div>
  );
}

export async function getServerSideProps(context: any) {
    console.log(context);
    
    return {
      props: {}, // will be passed to the page component as props
    }
  }
