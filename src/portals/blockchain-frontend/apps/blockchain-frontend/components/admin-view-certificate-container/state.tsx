import { useState } from 'react';
import { useRouter } from 'next/router';
import { getUserCertificateById } from '../../api/fetchData';
import { CertificateResponse } from '../../interfaces/viewModels';
import { useEth } from '../../contexts/EthContext';
import { notification } from 'antd';
import { decryptData } from '../utils';
export function usePageState() {
  const router = useRouter();
  const { view } = router.query;
  const certificateId = view;
  const [certificateDetail, setCertificateDetail] = useState<
    CertificateResponse[]
  >([]);
  const { state } = useEth();
  const { contract, accounts } = state;
  const [isClick, setIsClick] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const [isLording, setIsLording] = useState(false);

  const fetchCertificate = async () => {
    const getCertificateDetail = await getUserCertificateById(certificateId);
    if (getCertificateDetail) {
      const certificateRes: CertificateResponse = JSON.parse(
        await decryptData(getCertificateDetail)
      );
      setCertificateDetail([certificateRes]);
    }
  };
  const viewCertificate = async () => {
    fetchCertificate();
    checkShareButtonStatus();
    const publishedUrl = window.location.origin;
    //setUrl(`${publishedUrl}/share-certificate?share=${certificateId}`);

    setIsClick(true);
  };

  const checkShareButtonStatus = async () => {
    try {
      const shareStatus = await contract.methods
        .checkSharedCertificate(certificateId)
        .call({ from: accounts[0] });
      if (shareStatus) {
        setIsShared(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const shareCertificate = async () => {
    try {
      setIsLording(true);
      await contract.methods
        .shareCertificate(certificateId)
        .send({ from: accounts[0] });
      api.open({
        key: 'updatable',
        message: 'Certificate Share successful ',
        description: 'Certificate Share successful',
      });
      setIsShared(true);
      setIsLording(false);
    } catch (error) {
      console.error(error);
      api.open({
        key: 'updatable',
        message: 'Error ',
        description: 'Certificate Share Fail',
      });
      setIsLording(false);
    }
  };
  function copyTextToClipboard() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }
  function backToView() {
    setIsClick(false);
  }

  return {
    certificateDetail,
    isClick,
    viewCertificate,
    isShared,
    shareCertificate,
    contextHolder,
    copied,
    copyTextToClipboard,
    url,
    backToView,
    isLording,
  };
}
