import { Typography, Button, Table, Form, Input } from 'antd';
import styles from './TrainersContainer.module.css';
import { useComponentState } from './state';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import CancelConfirmationModal from '../shared/cancelConfirmation/CancelConfirmationModal';

export default function TrainerForm() {
  const { Title } = Typography;
  const {
    formik,
    isCancelModalOpen,
    handleCancel,
    closeModalOpen,
    confirmCancel,
    handleDelete,
    dataSource,
    fetchTrainers,
    isCancelDisable,
    total,
  } = useComponentState();
  const { handleSubmit, handleChange, values, errors } = formik;
  const columns = [
    {
      key: '1',
      title: 'First Name',
      dataIndex: 'FirstName',
      width: '25%',
    },
    {
      key: '2',
      title: 'Last Name',
      dataIndex: 'LastName',
      width: '25%',
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'EmailAddress',
      width: '33%',
    },

    {
      key: '4',
      title: 'Action',
      render: (data) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                handleDelete(data.Type, data.Id);
              }}
              style={{ color: 'red', marginLeft: 4 }}
            />
          </>
        );
      },
    },
  ];

  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchTrainers(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
        <div id="trainer-add-form">
          <Title level={3}></Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-left font-medium text-gray-800"
              >
                First Name
              </label>
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={values.firstName}
              />

              <p className="text-left text-red-500 mb-2">
                {errors.firstName ? `${errors.firstName}` : null}
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-left font-medium text-gray-800"
              >
                Last Name
              </label>
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={values.lastName}
              />

              <p className="text-left text-red-500 mb-2">
                {errors.lastName ? `${errors.lastName}` : null}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailAddress"
                className="block text-left font-medium text-gray-800"
              >
                Email Address
              </label>
              <Input
                name="emailAddress"
                type="text"
                placeholder="Email Address"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={values.emailAddress}
              />

              <p className="text-left text-red-500 mb-2">
                {errors.emailAddress ? `${errors.emailAddress}` : null}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                  formik.isValid
                    ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
                    : 'bg-blue-500 text-white font-semibold cursor-not-allowed'
                }`}
              >
                Submit
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={handleCancel}
                disabled={isCancelDisable}
              >
                Cancel
              </button>
            </div>
            {/* <Form.Item>
                          <div className="flex justify-center items-center">
                            <Button htmlType="submit"  className="w-7/12 bg-blue-500 text-white font-semibold flex items-center justify-center py-4 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                                Add Trainer             
                            </Button>
                          </div>
                        </Form.Item> */}
          </form>
          <CancelConfirmationModal
            isOpen={isCancelModalOpen}
            onCancel={closeModalOpen}
            onConfirm={confirmCancel}
          />
        </div>
        <div id="trainer-grid">
          <Table
            loading={false}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: DefaultPagination.pageSize,
              total: total,
              onChange: handlePaginationChange,
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
}
