# Family Pschiatry Counseling and Wellness

This is the source code for the Family Psychiatry Counseling and Wellness
website. It is a static site generated using React, Vite, and custom static
generation logic. To get started, you will need the following tools:

- Node 20

Commands should be run from the root directory of this package unless otherwise
specified. To start the development server, run `npm install` to install
dependencies, and then run `npm run develop`. The server will be available at
`http://localhost:5173`. The following commands, defined in _package.json_, will
also be useful during development:

- `clean`: Delete build artifacts.
- `build`: Create a production build of the site.
- `preview`: Preview the production site.

Site content resides in the _src_ folder. Pages are defined as React components
(_.tsx_) and can be registered by adding an entry in _engine/pages.ts_. They are
available on the site at the path that they appear in the source folder. For
instance, _src/library_ will be available at `/library` on the site. Templates
are further distinguished by using the _.template.tsx_ file extension. All other
files are copied as-is to the intermediate build directory.

> Note that content in the _src/public_ directory is available at the root
> of the site. See [Vite: Static Asset Handling](https://vite.dev/guide/assets)
> for more information.

The static generation engine is defined in the _engine_ folder. Refer to its
source code for more information on the develop and build workflows.
