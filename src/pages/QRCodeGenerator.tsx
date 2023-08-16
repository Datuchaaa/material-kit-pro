import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import QRCode from 'react-qr-code';
import ExportQRImage from '../components/ExportQRImage';
import './QRCodeGenerator.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const QRCodeGenerator: React.FC = () => {
  const [qrCodeData, setQRCodeData] = useState<string>(''); // Initialize with an empty string

  const handleRefresh = (resetForm: () => void) => {
    setQRCodeData(''); // Clear the QR code data
    resetForm();
  };

  return (
    <div className='qrgeneratot-wrapper'>
      <h1>QR Code Generator</h1>
      <Formik
        initialValues={{ text: '' }}
        validationSchema={Yup.object({
          text: Yup.string().required('Text is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setQRCodeData(values.text); // Set the QR code data
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="text"
                placeholder="Enter text here"
              />
              <FontAwesomeIcon
                className="refresh-icon"
                type="button"
                onClick={() => handleRefresh(resetForm)}
                icon={faArrowsRotate}
              />
              <ErrorMessage
                name="text"
                component="div"
                className="error"
              />
            </div>
            <div className="button-group">
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Generate QR Code
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {qrCodeData && <QRCode value={qrCodeData} />} {/* Render the QR code */}
      {qrCodeData && <ExportQRImage qrCodeData={qrCodeData} />}
    </div>
  );
};

export default QRCodeGenerator;
