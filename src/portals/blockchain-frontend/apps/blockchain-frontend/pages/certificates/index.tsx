import styles from './cart-page-certificates.module.css';
import { Select, Form, Button, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from './state';


export function CartPageCertificates() {
  const { formik, contextHolder, courseData, trainerData, traineeData, certificateId, copyTextToClipboard, copied, isRegister,
    registerIssuer} = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  const {
    handleSubmit,
    setFieldValue,
    values,
  } = formik;


  return (
    <div>

      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
          {!isRegister && (
            <div>   <button style={{
              position: 'absolute',
              width: 110,
              left: '98%',
              top: '150%',
            }} onClick={registerIssuer}>Register</button></div>
          )}
          {isRegister && (
            <div>
              <Form onFinish={handleSubmit}>
                <p>Select Course</p>
                <Select
                  placeholder="Select Course"
                  style={{ width: 150 }}
                  value={values.course}
                  onChange={value => {
                    setFieldValue("course", value);
                  }}
                >
                  {courseData.map((course, index) => (
                    <Select.Option key={index} value={course.Title}>
                      {course.Title}
                    </Select.Option>
                  ))}
                </Select>

                <p>Select Trainee</p>
                <Select
                  placeholder="Select Trainee"
                  style={{ width: 150 }}
                  value={values.trainee}
                  onChange={(value, data) => {
                    setFieldValue("trainee", value);
                    setFieldValue("data", data);

                  }}
                >
                  {traineeData.map((trainee, index) => (
                    <Select.Option key={index} value={trainee.FirstName} walletAddress={trainee.WalletAddress} id={trainee.Id}>
                      {trainee.FirstName}{' '}
                    </Select.Option>
                  ))}
                </Select>
                <p>Select Trainer</p>
                <Select
                  placeholder="Select Trainer"
                  style={{ width: 150 }}
                  value={values.trainer}
                  onChange={value => {
                    setFieldValue("trainer", value);
                  }}
                >
                  {trainerData.map((trainer, index) => (
                    <Select.Option key={index} value={trainer.FirstName}>
                      {trainer.FirstName}{' '}
                    </Select.Option>
                  ))}
                </Select>
                <p>Select Certificate Issue Date</p>

                <div>
                  <DatePicker onChange={(date) => setFieldValue('certificateIssueDate', date)} />
                </div>

                <p></p>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    type="primary"

                  >
                    Issue Certificate
                  </Button>
                </Form.Item>
                {/* <Button type="primary" icon={<DownloadOutlined />} onClick={pdfGenerate}>
            Download
          </Button> */}

                <div className={styles['Meta']}>
                  <div
                    className={styles['certificateWrapper']}
                    ref={certificateWrapper}
                  >
                    <p className={styles['p1']}>{values.course}</p>
                    <p className={styles['p2']}>{values.trainee}</p>
                    <p className={styles['p3']}>{values.certificateIssueDate}</p>
                    <Image
                      src="/issue-cert.png"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                </div>
                <br />
                <br />

                <Button
                  style={{
                    position: 'absolute',
                    width: 110,
                    left: '98%',
                    top: '120%',
                  }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={async (e) => {
                    e.preventDefault();
                    const { exportComponentAsPNG } = await import(
                      'react-component-export-image'
                    );
                    exportComponentAsPNG(certificateWrapper);
                  }}
                >
                  Download
                </Button>
              </Form>

              {certificateId && (
                <div>
                  <label style={{
                    position: 'absolute',
                    width: 200,
                    left: '98%',
                    top: '130%',
                  }}>{`${process.env.NEXT_PUBLIC_BASE_CERTIFICATE_URL}/view-certificate?view=${certificateId}`}</label>
                  <button style={{
                    position: 'absolute',
                    width: 110,
                    left: '98%',
                    top: '150%',
                  }} onClick={copyTextToClipboard}>Copy URL</button>
                  {copied && <p style={{
                    position: 'absolute',
                    width: 100,
                    left: '98%',
                    top: '160%',
                  }}>URL Copied!</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPageCertificates;
