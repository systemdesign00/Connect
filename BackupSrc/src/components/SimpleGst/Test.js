const [inputValues, setInputValues] = useState('');
  const [suggestionss, setSuggestionss] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(null);

  useEffect(() => {
    const fetchSuggestionss = async () => {
      try {
        const response = await fetch(`https://serdb.onrender.com/api/Oldgoldpurchase`);
        const data = await response.json();
        setSuggestionss(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestionss();
  }, []);

  const handleInputChangess = (event, value) => {
    setInputValues(value);
  };

const handleSuggestionChanges = (event, value) => {
    setSelectedBooks(value);

    // Manually update other fields based on selectedBook
    setValues((prevValues) => ({
      ...prevValues,
      fullbillNoName: value?.fullName || prevValues.fullName,
      imageSrc: value?.imageSrc || prevValues.imageSrc,
      mobile: value?.mobile || prevValues.mobile,
      customerUID: value?.customerId || prevValues.customerUID,
      city: value?.city || prevValues.city,
      pannumber: value?.pannumber || prevValues.pannumber,
      aadhaarnumber: value?.aadhaarnumber || prevValues.aadhaarnumber,
        imageSrc: value?.imageSrc || prevValues.imageSrc,
    }));
  };
 // Step 4: Custom filter function for searching across multiple fields
const filterOptionss = (options, { inputValue }) => {
  const inputValueLower = inputValue.toLowerCase();
  return options.filter((option) => {
    const fullName = option.fullName || '';
    const city = option.city || '';
    const mobile = option.mobile || '';
    const aadhaarnumber = option.aadhaarnumber || '';
     const pannumber = option.pannumber || '';
      const id = option.id || '';

    return (
      fullName.toLowerCase().includes(inputValueLower) ||
      city.toLowerCase().includes(inputValueLower) ||
      mobile.toLowerCase().includes(inputValueLower) ||
     aadhaarnumber.toLowerCase().includes(inputValueLower) ||
      pannumber.toLowerCase().includes(inputValueLower) ||
    (((id) + 0).toString(8)).padStart(3, '0').toString().toLowerCase().includes(inputValueLower) 
    );
  });
};

const renderOptions = (props, option, { inputValue }) => {
  const matches = option.fullName.toLowerCase().includes(inputValue.toLowerCase())
    || option.city.toLowerCase().includes(inputValue.toLowerCase())
    || option.mobile.toLowerCase().includes(inputValue.toLowerCase())
    || option.id.toString().toLowerCase().includes(inputValue.toLowerCase());

  const highlightMatchess = (text, inputValue) => {
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'bold', background: 'yellow' }}>
              {part}
            </span>
          ) : (
            <span key={index}>
              {part}
            </span>
          )
        ))}
      </span>
    );
  };
   return (
    <Box {...props}>
      <Typography variant="body1" component="div">
     {highlightMatchess(option.fullName, inputValue)} = {highlightMatchess(option.billNo, inputValue)} - {highlightMatchess((option.amountdebit), inputValue)} 
      </Typography>
    </Box>
  );
   }