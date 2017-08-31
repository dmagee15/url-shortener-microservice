# URL Shortener Microservice

### User Stories

#### 1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

#### 2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

#### 3. When I visit that shortened URL, it will redirect me to my original link.

The API endpoint is the [base url]/api/[your url to shorten]

The API endpoint for the resulting shortened url will be [base url]/[# code]

### Example Usage

[base url]/api/www.google.com

### Example Output

{"url":"www.google.com","shorturl":1}

Short url: [base url]/1