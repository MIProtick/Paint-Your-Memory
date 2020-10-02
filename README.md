# Paint Your Moment

***Image Colorization***, a task of coloring monochrome and old images, plays an
important role in the human perception of visual information to B&W pictures.

&nbsp;
## Description

There exist a large number of historic photographs which contain an insufficient
amount of colors and luminance information. Colorizing those images will help us
in recreating those moments and a better perception of the old times.

Technically speaking, many of the recent developments in colorization
involve images that contain a common theme or require highly processed data such
as semantic maps as input.

&nbsp;
## Methodology
> Step 1
> ### *Clone the repository*
> ```shell
> git clone https://github.com/MIProtick/Paint-Your-Memory.git
> cd Paint-Your-Memory
> ```

> Step 2
> #### *Adjust working environment*
> * [Create virtual environment](https://docs.python.org/3/tutorial/venv.html)

> Step 3
> #### *Install required packages*
> ```shell
> pip install -r requirements.txt
> ```

> Step 4
> #### *Download required assets*
> ```shell
> python model_asset.py
> ```

> Step 5
> #### *Collect static files*
> ```shell
> python manage.py collectstatic
> ```

> Step 6
> #### *Run server*
> ```shell
> python manage.py runserver
> ```

> Step 7
> #### *Voilà!! We are good to go.*

&nbsp;
&nbsp;
&nbsp;

## Reference
> ```
>@inproceedings{zhang2016colorful,
>  title={Colorful Image Colorization},
>  author={Zhang, Richard and Isola, Phillip and Efros, Alexei A},
>  booktitle={ECCV},
>  year={2016}}
>```
