import PropTypes from 'prop-types'

export const theme = {
  color: {
    primary1: 'linear-gradient(273.22deg, #5DB9FF -9.6%, #3980E8 104.4%);',
    primary2: '#3980E8',
    primary3: '#ffffff',
    primary4: '#303030',
    primary5: '#F2F6FB',
    primary2Light: 'rgba(57, 128, 232, 0.25)',
    primary2Lighter: 'rgba(57, 128, 232, 0.65)',
    primary2Darker: '#1962CD',
    error: '#FF5645',
    warning: '#FFB357',
    success: '#4BCC7E',
    errorBg: '#FFF1F0',
    warningBg: '#FFF7E7',
    successBg: '#DAF5E5',
    statusExtraction: '#85A5FF',
    grayscale1: '#DCE1E7',
    grayscale1Darker: '#C4C4C4',
    grayscale2: '#EAF0F8',
    grayscale3: '#404040',
    grayscale4: 'rgba(48, 48, 48, 0.2)',
    grayscale5: '#657181',
    grayscale6: '#F0F6FE',
    grayscale7: '#D9E6F6',
    grayscale8: '#F5F5F5',
    shadow1: 'rgba(220, 225, 231, 0.6)',
    borderIcon: '#64A3F5',

    // TODO: #567
    primary3Light: '#ffffffE6',
    grayScale8: '#87898B',
    grayscale15: '#DCE1E7',
    primary1Dark: 'rgba(48, 48, 48, 0.55)',
    gradient1: 'rgba(93, 185, 255, 0)',
    gradient2: 'rgba(43, 105, 222, 0.8)',
    secondaryLight: '#d9d9d9',
    errorDark: '#ff0000'
  },
  size: {
    siderExpandedWidth: '22rem',
    siderCollapsedWidth: '5.6rem',
    drawerWidth: '45rem',
    drawerWidthDocumentReview: '36rem'
  }
}

export const themeShape = PropTypes.shape({
  color: PropTypes.shape({
    primary1: PropTypes.string.isRequired,
    primary2: PropTypes.string.isRequired,
    primary3: PropTypes.string.isRequired,
    primary4: PropTypes.string.isRequired,
    primary5: PropTypes.string.isRequired,
    primary2Light: PropTypes.string.isRequired,
    primary2Lighter: PropTypes.string.isRequired,
    primary2Darker: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    errorBg: PropTypes.string.isRequired,
    warningBg: PropTypes.string.isRequired,
    successBg: PropTypes.string.isRequired,
    statusExtraction: PropTypes.string.isRequired,
    grayscale1: PropTypes.string.isRequired,
    grayscale1Darker: PropTypes.string.isRequired,
    grayscale2: PropTypes.string.isRequired,
    grayscale3: PropTypes.string.isRequired,
    grayscale4: PropTypes.string.isRequired,
    grayscale5: PropTypes.string.isRequired,
    grayscale6: PropTypes.string.isRequired,
    grayscale7: PropTypes.string.isRequired,
    shadow1: PropTypes.string.isRequired,
    grayScale8: PropTypes.string.isRequired,
    grayscale15: PropTypes.string.isRequired,
    primary1Dark: PropTypes.string.isRequired,
    gradient1: PropTypes.string.isRequired,
    gradient2: PropTypes.string.isRequired,
    secondaryLight: PropTypes.string.isRequired,
    errorDark: PropTypes.string.isRequired
  }),
  size: PropTypes.shape({
    siderExpandedWidth: PropTypes.string.isRequired,
    siderCollapsedWidth: PropTypes.string.isRequired,
    drawerWidth: PropTypes.string.isRequired,
    drawerWidthDocumentReview: PropTypes.string.isRequired
  })
})
