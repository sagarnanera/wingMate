// society details page, which will display all the details of the society, with edit functionality.

import React, { useState, useEffect } from "react";
import { Button, Card, TabItem, Table, Tabs } from "flowbite-react";
import { MdEdit } from "react-icons/md";

const SocietyDetailsPage = () => {
  const [societyData, setSocietyData] = useState({
    _id: "1",
    name: "society A",
    address: "some address",
    area: 10000,
    wingIds: ["1", "2"],
    propertyIds: ["1", "2"],
    totalWings: 2,
    totalProperties: 2,
    totalResidents: 4,
  });
  //   const [isSocietyFormVisible, setSocietyFormVisible] = useState(false);

  // TODO : Fetch society from the backend

  // useEffect(() => {
  //     const fetchSociety = async () => {
  //         const response = await fetch("/api/society");
  //         const data = await response.json();
  //         setSociety(data);
  //     };

  //     fetchSociety();

  // }, []);

  return (
    <>
      {/* society details */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Society Details
        </h1>
        <Card className="mb-8">
          <Tabs className="space-x-4">
            <TabItem title="Overview">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Society Name:
                  </p>
                  <p className="text-lg text-gray-900">{societyData.name}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">Area:</p>
                  <p className="text-lg text-gray-900">{societyData.area}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">Address:</p>
                  <p className="text-lg text-gray-900">{societyData.address}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Total Wings:
                  </p>
                  <p className="text-lg text-gray-900">
                    {societyData.totalWings}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Total Properties:
                  </p>
                  <p className="text-lg text-gray-900">
                    {societyData.totalProperties}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Total Residents:
                  </p>
                  <p className="text-lg text-gray-900">
                    {societyData.totalResidents}
                  </p>
                </div>
              </div>
            </TabItem>
            <TabItem title="Residents">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Contact</Table.HeadCell>
                    {/* Add more headers if needed */}
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {societyData?.residents?.map((resident) => (
                    <Table.Row key={resident.id}>
                      <Table.Cell>{resident.name}</Table.Cell>
                      <Table.Cell>{resident.email}</Table.Cell>
                      <Table.Cell>{resident.contact}</Table.Cell>
                      {/* Add more cells if needed */}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </TabItem>
            {/* Add more tabs for different sections */}
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default SocietyDetailsPage;
