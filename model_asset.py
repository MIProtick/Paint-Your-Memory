import wget

url = ['https://colorizers.s3.us-east-2.amazonaws.com/colorization_release_v2-9b330a0b.pth', 
    'https://colorizers.s3.us-east-2.amazonaws.com/siggraph17-df00044c.pth'
]

dir = ['models/colorization_release_v2-9b330a0b.pth', 
'models/siggraph17-df00044c.pth'
]

for i in range(2):
    wget.download(url[i], dir[i])
